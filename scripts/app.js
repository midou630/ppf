document
    .getElementById("generateBtn")
    .addEventListener("click", async () => {

        const data = getFormData();

        renderPrescription(data);

        await generatePDF();
    });


// =======================================
// معرفة إحداثيات الضغط فوق الوصفة
// =======================================

const template =
    document.getElementById("prescriptionTemplate");

template.addEventListener("click", (e) => {

    const rect =
        template.getBoundingClientRect();

    const x =
        e.clientX - rect.left;

    const y =
        e.clientY - rect.top;

    console.log("X:", x);
    console.log("Y:", y);

});


// =======================================
// 🔥 نظام الأدوية من JSON (Dropdown + Search)
// =======================================

let medicationsData = [];

fetch("assets/data/medications.json")
    .then(res => res.json())
    .then(data => {
        medicationsData = data;
    })
    .catch(err => console.error("خطأ في تحميل الأدوية:", err));

const medInput =
    document.getElementById("medications");

const medList =
    document.getElementById("medicationsList");


// عرض القائمة
function renderMedicationsList(list) {

    medList.innerHTML = "";

    if (list.length === 0) {
        medList.innerHTML = "<div class='med-item'>لا يوجد نتائج</div>";
        return;
    }

    list.forEach(med => {

        const item =
            document.createElement("div");

        item.classList.add("med-item");

        item.innerText = med;

        item.addEventListener("click", () => {

            medInput.value = med;

            medList.innerHTML = "";

        });

        medList.appendChild(item);

    });
}


// عند الضغط على الحقل
medInput.addEventListener("click", () => {

    renderMedicationsList(medicationsData);

});


// عند الكتابة (بحث مباشر)
medInput.addEventListener("input", () => {

    const value =
        medInput.value.toLowerCase();

    const filtered =
        medicationsData.filter(med =>
            med.toLowerCase().includes(value)
        );

    renderMedicationsList(filtered);

});


// إخفاء القائمة عند الضغط خارجها
document.addEventListener("click", (e) => {

    if (
        !medInput.contains(e.target) &&
        !medList.contains(e.target)
    ) {
        medList.innerHTML = "";
    }

});
