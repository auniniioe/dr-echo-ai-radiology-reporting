// Search functionality
document.getElementById('searchInput').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    filterTemplates(searchTerm);
});

// Filter functionality
document.getElementById('filterSelect').addEventListener('change', function (e) {
    const filterValue = e.target.value;
    filterByCategory(filterValue);
});

function getTemplateRows() {
    return document.querySelectorAll('#templatesTableBody tr');
}

function filterTemplates(searchTerm) {
    const rows = getTemplateRows();
    let visibleCount = 0;

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const isVisible = text.includes(searchTerm);
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
    });

    updateTemplateCount(visibleCount);
}

function filterByCategory(category) {
    const rows = getTemplateRows();
    let visibleCount = 0;

    rows.forEach(row => {
        const rowCategory = row.getAttribute('data-category');
        const isVisible = category === 'all' || rowCategory === category;
        row.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount++;
    });

    updateTemplateCount(visibleCount);
}

function updateTemplateCount(count) {
    document.getElementById('templateCount').textContent = count;
}

// Preview Template
function previewTemplate(templateId) {
    const modal = document.getElementById('previewModal');
    const previewContent = document.getElementById('previewContent');

    previewContent.innerHTML = getTemplatePreview(templateId);
    modal.style.display = 'block';
}

// Get template preview HTML
function getTemplatePreview(templateId) {
    const previews = {
        'ct-mri-liver': `
            <div class="template-preview template-preview-liver">
                <div class="preview-header">
                    <h3>CT AND MRI LIVER REPORT</h3>
                    <p class="preview-subtitle">Structured preview aligned with the CT_MR_Liver template sections.</p>
                </div>

                <div class="preview-section">
                    <h4>1. Patient Information</h4>
                    <div class="preview-row"><span class="preview-label">Patient Name</span><span class="preview-value">[Patient Name]</span></div>
                    <div class="preview-row"><span class="preview-label">Date of Birth / Age / Sex</span><span class="preview-value">[DOB] / [Age] / [Sex]</span></div>
                    <div class="preview-row"><span class="preview-label">Patient ID / Report ID</span><span class="preview-value">[Patient ID] / [Report ID]</span></div>
                    <div class="preview-row"><span class="preview-label">Referring Physician / Institution</span><span class="preview-value">[Referrer] / [Institution]</span></div>
                    <div class="preview-row"><span class="preview-label">Report Date & Time</span><span class="preview-value">[Date & Time]</span></div>
                </div>

                <div class="preview-section">
                    <h4>2. Procedure Information</h4>
                    <div class="preview-row"><span class="preview-label">Modality</span><span class="preview-value">[CT or MRI]</span></div>
                    <div class="preview-row"><span class="preview-label">Study Type</span><span class="preview-value">[Contrast / Non-Contrast]</span></div>
                    <div class="preview-row"><span class="preview-label">Contrast Agent / Volume</span><span class="preview-value">[Type] / [Volume ml]</span></div>
                    <div class="preview-row"><span class="preview-label">Vascular Subtraction / Purpose</span><span class="preview-value">[Yes/No] / [APHE, Washout, APHE and Washout]</span></div>
                </div>

                <div class="preview-section">
                    <h4>3. Clinical Information</h4>
                    <div class="preview-row"><span class="preview-label">Risk Factors for HCC</span><span class="preview-value">[Cirrhosis, HBV, Current HCV]</span></div>
                    <div class="preview-row"><span class="preview-label">Etiology of Liver Disease</span><span class="preview-value">[List all that apply]</span></div>
                    <div class="preview-row"><span class="preview-label">Prior Treatment / Dates</span><span class="preview-value">[Yes/No], [Modality], [Date(s)]</span></div>
                    <div class="preview-row"><span class="preview-label">Pathology</span><span class="preview-value">[Diagnosis and date if available]</span></div>
                </div>

                <div class="preview-section">
                    <h4>4. Comparison</h4>
                    <div class="preview-row"><span class="preview-label">Comparison Available</span><span class="preview-value">[Yes/No]</span></div>
                    <div class="preview-row"><span class="preview-label">Prior Exam Modality / Contrast / Date</span><span class="preview-value">[CT/MRI] / [Type] / [Date]</span></div>
                    <div class="preview-row"><span class="preview-label">Comparison Remarks</span><span class="preview-value">[Free text]</span></div>
                </div>

                <div class="preview-section">
                    <h4>5. Findings</h4>
                    <div class="preview-row"><span class="preview-label">Background Liver</span><span class="preview-value">Cirrhosis [Yes/No], Steatosis [Yes/No], Siderosis [Yes/No]</span></div>
                    <div class="preview-row"><span class="preview-label">Observation Type</span><span class="preview-value">[Lesion(s) / Non-lesion]</span></div>
                    <div class="preview-row"><span class="preview-label">Lesion / Aggregate Details</span><span class="preview-value">[Size, Location, Imaging Features, Vascular, Biliary]</span></div>
                    <div class="preview-row"><span class="preview-label">Additional Findings</span><span class="preview-value">Portal Hypertension [Yes/No], Extra Hepatic Findings [Optional]</span></div>
                </div>

                <div class="preview-section">
                    <h4>6. Impression</h4>
                    <div class="preview-row"><span class="preview-label">Impression Summary</span><span class="preview-value">[Concise diagnostic summary]</span></div>
                    <div class="preview-row"><span class="preview-label">Recommendation / Follow-up</span><span class="preview-value">[Suggested next step]</span></div>
                </div>

                <div class="preview-section">
                    <h4>7. Report Summary & Sign-off</h4>
                    <div class="preview-row"><span class="preview-label">Exam Conclusion</span><span class="preview-value">[Final conclusion]</span></div>
                    <div class="preview-row"><span class="preview-label">Report Created by</span><span class="preview-value">[Radiologist Name]</span></div>
                    <div class="preview-row"><span class="preview-label">Approved by</span><span class="preview-value">[Approver Name]</span></div>
                </div>
            </div>
        `,

        'breast-mammography': `
            <div class="template-preview template-preview-breast">
                <div class="preview-header">
                    <h3>BREAST MAMMOGRAPHY REPORT</h3>
                    <p class="preview-subtitle">Structured preview aligned with the Breast Mammography template sections.</p>
                </div>

                <div class="preview-section">
                    <h4>1. Patient Information</h4>
                    <div class="preview-row"><span class="preview-label">Patient Name</span><span class="preview-value">[Patient Name]</span></div>
                    <div class="preview-row"><span class="preview-label">Date of Birth / Age / Sex</span><span class="preview-value">[DOB] / [Age] / [Sex]</span></div>
                    <div class="preview-row"><span class="preview-label">Patient ID / Report ID</span><span class="preview-value">[Patient ID] / [Report ID]</span></div>
                    <div class="preview-row"><span class="preview-label">Referring Physician / Institution</span><span class="preview-value">[Referrer] / [Institution]</span></div>
                    <div class="preview-row"><span class="preview-label">Report Date & Time</span><span class="preview-value">[Date & Time]</span></div>
                </div>

                <div class="preview-section">
                    <h4>2. Procedure Information</h4>
                </div>

                <div class="preview-section">
                    <h4>3. Clinical Information</h4>
                </div>

                <div class="preview-section">
                    <h4>4. Comparison</h4>
                    <div class="preview-row"><span class="preview-label">Comparison Remarks</span><span class="preview-value">[Free text]</span></div>
                </div>

                <div class="preview-section">
                    <h4>5. Findings</h4>
                </div>

                <div class="preview-section">
                    <h4>6. Impression</h4>
                    <div class="preview-row"><span class="preview-label">Impression Summary</span><span class="preview-value">[Concise diagnostic summary]</span></div>
                    <div class="preview-row"><span class="preview-label">Recommendation / Follow-up</span><span class="preview-value">[Suggested next step]</span></div>
                </div>

                <div class="preview-section">
                    <h4>7. Report Summary & Sign-off</h4>
                    <div class="preview-row"><span class="preview-label">Exam Conclusion</span><span class="preview-value">[Final conclusion]</span></div>
                    <div class="preview-row"><span class="preview-label">Report Created by</span><span class="preview-value">[Radiologist Name]</span></div>
                    <div class="preview-row"><span class="preview-label">Approved by</span><span class="preview-value">[Approver Name]</span></div>
                </div>
            </div>
        `
    };
    
    return previews[templateId] || '<p>Template preview not available.</p>';
}

// Handle templates that are not yet implemented as a dedicated page
function useTemplate(templateId, templateName) {
    if (templateId === 'breast-mammography') {
        alert(`${templateName} form is coming soon.`);
        return;
    }
}

// Close modal
function closeModal() {
    document.getElementById('previewModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    updateTemplateCount(getTemplateRows().length);
});
