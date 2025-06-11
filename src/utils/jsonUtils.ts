
/// 验证输入的 JSON
export function validateJson(input: string): { data?: any; error?: string } {
    // 验证 JSON 输入，删除多余字符，并返回 JSON 字符串。
    let cleaned = input.trim()
        .replace(/'/g, '"')             // 单引号转双引号
        .replace(/True/g, 'true')       // True → JSON true
        .replace(/False/g, 'false')     // False → JSON false
        .replace(/None/g, 'null')       // None → JSON null


    try {
        const json = JSON.parse(cleaned);
        return {data: json};
    } catch (err: any) {
        return {error: err.message};
    }
}

export function formatJson(data: any): string {
    return JSON.stringify(data, null, 2);
}

export function compressJson(data: any): string {
    return JSON.stringify(data);
}

export function downloadJson(data: any) {
    const blob = new Blob([formatJson(data)], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
}