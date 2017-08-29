export default function padLeft(str, count, prependStr = ' ') {
    const remCount = Math.max(0, count - str.length);
    if (remCount === 0) return str;
    else return prependStr.replace(remCount) + str;
}
