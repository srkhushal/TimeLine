export function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex.split("").map(c => c + c).join("");
    }
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
    };
}

export function applySepia({ r, g, b }, amount) {
    amount = amount / 100;
    const tr = 0.393 * r + 0.769 * g + 0.189 * b;
    const tg = 0.349 * r + 0.686 * g + 0.168 * b;
    const tb = 0.272 * r + 0.534 * g + 0.131 * b;
    return {
        r: tr * amount + r * (1 - amount),
        g: tg * amount + g * (1 - amount),
        b: tb * amount + b * (1 - amount)
    };
}

export function applyBrightness({ r, g, b }, amount) {
    amount = parseFloat(amount) / 100;
    return { r: r * amount, g: g * amount, b: b * amount };
}

export function applyContrast({ r, g, b }, amount) {
    amount = parseFloat(amount) / 100;
    const factor = (259 * (amount + 255)) / (255 * (259 - amount));
    return {
        r: factor * (r - 128) + 128,
        g: factor * (g - 128) + 128,
        b: factor * (b - 128) + 128
    };
}

export function filterColor(hex, filter) {
    let rgb = hexToRgb(hex);

    if (filter.sepia) rgb = applySepia(rgb, parseInt(filter.sepia));
    if (filter.brightness) rgb = applyBrightness(rgb, parseInt(filter.brightness));
    if (filter.contrast) rgb = applyContrast(rgb, parseInt(filter.contrast));

    // Clamp values
    rgb.r = Math.min(255, Math.max(0, Math.round(rgb.r)));
    rgb.g = Math.min(255, Math.max(0, Math.round(rgb.g)));
    rgb.b = Math.min(255, Math.max(0, Math.round(rgb.b)));

    return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}
