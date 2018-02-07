/**
 * localStorage
 * name key值
 * value value值
 */
export const _localStorage = (name, value) => {
    const _name = String(name);
    const _value = String(value) || ''
    if (value) {
        window.localStorage.setItem(_name, _value)
    } else {
        return window.localStorage.getItem(_name)
    }
}
