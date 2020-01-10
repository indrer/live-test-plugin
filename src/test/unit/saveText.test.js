import { saveText } from '../../js/util/fileDownloader'

describe('saveText', () => {
  it("should download the file", () => {
    const tempElem = {
      click: jest.fn()
    }
    jest.spyOn(document, 'createElement').mockImplementation(() => tempElem)
    saveText('test.wtest', 'text')
    expect(tempElem.download).toEqual('test.wtest')
    expect(tempElem.click).toHaveBeenCalledTimes(1)
  })
})