export default [
    {
        // Aplicar a todos los archivos JavaScript
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "commonjs", // Para soportar require()
            globals: {
                // Definición manual de globales para evitar errores de 'no-undef'
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
                module: "readonly",
                require: "readonly",
                process: "readonly",
                __dirname: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
            "complexity": ["error", 5] // Regla de complejidad del Lab 4
        }
    }
];