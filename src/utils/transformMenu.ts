function transformMenu(arry: any){
  return arry.map((item:any) => {
    const newItem: any = {
      label: item.name,
      url: item.url
    }
    if(item.children){
      newItem.children = transformMenu(item.children)
    }
    return newItem
  })
}

export { transformMenu }