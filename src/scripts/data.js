const data = {
    getData(dataSet) {
        return fetch(`http://localhost:8088/${dataSet}`)
            .then(response => response.json())
    },
    postData(dataType, newData) {
        return fetch(`http://localhost:8088/${dataType}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })
    },
    putData(interestId, interest){
        return fetch(`http://localhost:8088/interests?id=${interestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interest)
        })
    },
    deleteData(dataType, dataId) {
        return fetch(`http://localhost:8088/${dataType}/${dataId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default data