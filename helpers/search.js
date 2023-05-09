export const Search = (data, searchQuery) => {
    const searchedData = data.filter(element => {
        return element.nama_proker.toLowerCase().includes(searchQuery.toLowerCase());
    })
    return searchedData;
}