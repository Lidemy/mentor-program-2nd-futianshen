var stars = require('./hw1') // 檔案路徑 （檔案輸出的地方）

describe("hw1", function() {
  it("should return correct answer when n = 1", function() {
    expect(stars(1)).toEqual(['*'])
  })
})