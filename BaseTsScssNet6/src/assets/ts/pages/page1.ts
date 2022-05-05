(async () => {
    const m = await import('../Modules/Dog')
        .then(m => m.default)

    const dog = new m();
    dog.bark();
    dog.bark();
})()

console.log("page1.ts - lazy dog module loaded");
