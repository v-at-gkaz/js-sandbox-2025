module.exports = class Square {
    constructor(w) {
        this.w = w;
    }

    area() {
        return this.w ** 2;
    }
}