import exportFromJSON from 'export-from-json'

export const exportJsonToCsv = (TABLE_ROWS,NAME) => {
  const data = TABLE_ROWS
  const fileName = NAME
  const exportType =  exportFromJSON.types.csv

  return exportFromJSON({ data, fileName, exportType })
}

//fields : ["clounm1", "clounm2"] || {'clounm1':tasks, 'clounm2':talk} can put in the exportFromJSON

//data: data.someKey in json