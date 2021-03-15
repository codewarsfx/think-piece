export const getIdAndData = doc => {

    return{
        id: doc.id,
        ...doc.data()
    }
}