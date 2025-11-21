export function exportData(data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        const file = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = url;
        a.download = "timeline.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (e) {
        console.error("Error exporting data:", e);
    }
}
export function importData(setter) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = () => {
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const json = e.target?.result;
                const data = JSON.parse(json);
                setter(data);

            } catch (err) {
                console.error("Invalid JSON file:", err);
            }
        };

        reader.readAsText(file);
    };

    input.click();
}
