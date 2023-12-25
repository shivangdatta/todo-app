const apireq = async (url ='' , optionsObj = null , errMSG = null) =>{
    try {
        const response = await fetch(url , optionsObj);
        if(!response.ok) throw Error('please reload app');
    }
    catch(err){
        errMSG = err.message;
    }
    finally {
        return errMSG;
    }
}
export default apireq ;