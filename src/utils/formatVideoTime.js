import padLeft from './padLeft';

export default function formatVideoTime(time) {
    const hours = padLeft(Math.floor(time / (60 * 60)), 2, '0');
    const minutes = padLeft(Math.floor(time / 60), 2, '0');
    const secondsAndMilliseconds = padLeft((time % 60).toFixed(3), 6, '0');
    return `${hours}:${minutes}:${secondsAndMilliseconds}`;
}
