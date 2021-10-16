const square = require("./square")
// @ponicode
describe("square.draw", () => {
    test("0", () => {
        let object = [[410, 400, 1], [410, 520, 520], [70, 380, 320]]
        let callFunction = () => {
            square.draw({ fill: true, stroke: "George", points: object }, { rect: () => 410, fill: () => true, stroke: () => "Michael" }, 1, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [[1, 70, 50], [400, 90, 380], [320, 90, 90]]
        let callFunction = () => {
            square.draw({ fill: true, stroke: "Michael", points: object }, { rect: () => 100, fill: () => true, stroke: () => "Anas" }, -1, 0.5)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [[30, 520, 400], [30, 100, 90], [400, 520, 410]]
        let callFunction = () => {
            square.draw({ fill: true, stroke: "Anas", points: object }, { rect: () => 320, fill: () => false, stroke: () => "Pierre Edouard" }, 0.5, 10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [[1, 320, 90], [410, 520, 50], [520, 400, 380]]
        let callFunction = () => {
            square.draw({ fill: true, stroke: "Michael", points: object }, { rect: () => 1, fill: () => true, stroke: () => "Anas" }, 0, 0.5)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = [[320, 320, 550], [520, 350, 100], [1, 100, 100]]
        let callFunction = () => {
            square.draw({ fill: false, stroke: "George", points: object }, { rect: () => 50, fill: () => false, stroke: () => "Michael" }, 1, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            square.draw({}, { rect: () => -Infinity, fill: () => true, stroke: () => "" }, -Infinity, -Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
