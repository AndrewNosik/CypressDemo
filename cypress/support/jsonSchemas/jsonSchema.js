export const jsonSchema = {
    create: {
        $schema: "Schema create user",
        type: "object",
        properties: {
            type: { type: "string" },
            code: { type: "integer", pattern: "^d{3}$" },
            message: { type: "string" },
        },
        required: [
            "type",
            "code",
            "message",
        ]
    },
    object: {
        $schema: "Schema object",
        type: "object",
        properties: {
            data: {
                type: "object",
                properties: {
                    string: { type: "string" },
                    number: { type: "integer" },
                    identityType: { type: "boolean" },
                },
                required: [
                    "id",
                    "number",
                    "boolean",
                ]
            },
        },
        required: ["data"]
    },
    array: {
        $schema: "array",
        type: "object",
        properties: {
            data: {
                type: "array",
                items: [
                    {
                        type: "object",
                        properties: {
                            "string": { "type": "string" },
                            "number": { "type": "integer" },
                            "boolean": { "type": "boolean" },
                        },
                        "required": [
                            "string",
                            "number",
                            "boolean"
                        ]
                    }
                ]
            }
        },
        "required": [
            "data"
        ]
    },
}