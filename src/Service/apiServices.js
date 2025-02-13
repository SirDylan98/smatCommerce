import axios from "axios";


const baseURL = "http://localhost:8088/api/v1/"    // Dev Env
const baseURLCart = "http://localhost:8082/api/v1/"  
const baseURLOrder = "http://localhost:8083/api/v1/"  
const baseURLPayments = "http://localhost:8085/api/v1/" 
//const baseURL = "http://40.123.249.217:3677/api/v2/" // Dev Env

//const baseURL ="http://appsaas.southafricanorth.cloudapp.azure.com:3677/api/v2/"

//=================== Products APIs ========================
export const createProduct = (product)=>{
    return axios.post(`${baseURL}products/create`,product);
}
//=================== Products APIs ========================
export const updateProduct = (product)=>{
    return axios.put(`${baseURL}products/update`,product);
}
export const getAllProducts = ()=>{

    return axios.get(`${baseURL}products/getall`);

}
export const searchProduct=(searchKey)=>{
   return axios.get(`${baseURL}products/search/${searchKey}`);
}
export const getProductsByCategory=(category)=>{
    return axios.get(`${baseURL}products/category/${category}`)
}

//=========================Cart APIs =============================

export const getUserCart=(userId)=>{
    return axios.get(`${baseURL}carts/${userId}`)
}
export const removeFromCart=(userId, productId)=>{
    return axios.delete(`${baseURL}carts/${userId}/remove/${productId}`)
}
export const addToCart=(request)=>{
    return axios.post(`${baseURL}carts/add`,request)
}
export const subtractFromCart=(request)=>{
    return axios.post(`${baseURL}carts/subtract`,request)
}

//============================ Order APIs ======================

export const checkOutCart=(request)=>{
    return axios.post(`${baseURL}orders/create`,request)
}

//=============================Payment APIs =========================

//getemployeeusername
export const getPaymentBySessionId=(sessionId)=>{
    return axios.get(`${baseURL}payments/getpaymentbysessionid/${sessionId}`)
}
//===========================Inventory apis =====================
export const getAllInventory=()=>{
    return axios.get(`${baseURL}inventory`)
}
export const updateInventoryLevel=(request)=>{
    return axios.put(`${baseURL}inventory/update`,request);
    
 }
 export const getInventoryAtReorderLevel=()=>{
    return axios.get(`${baseURL}inventory/reorder-level`);
    
 }
 //=================================ADMIN ENDPOINTS======================================
export const getAllUnAssignedPolicyCourses=(employeeNumber)=>{
    return axios.get(`${baseURL}getallunassignedpolicies/6/${employeeNumber}`)
}
export const getallUnassignedOtherCourses=(employeeNumber)=>{
    return axios.get(`${baseURL}getallunassignedOtherCourses/${employeeNumber}`)
}
 export const saveAssignedCourses=(courses)=>{
    return axios.post(`${baseURL}user/assigncourse/`,courses);
 }
export const getLoginNameForCasual=(employeeId)=>{ //getloginamecasual
 return axios.get(`${baseURL}user/getloginamecasual/${employeeId}`)
}
export const loginAuth=(authRequest)=>{
    return axios.post(`${baseURL}user/authen/`,authRequest);
 }
 //registercasual
 export const registerCasual=(regRequest)=>{
    return axios.post(`${baseURL}user/registercasual/`,regRequest);
 }
 export const getAllCategory = ()=>{
    return axios.get(`${baseURL}admin/getallcategory`)
 }
 export const isSupervisor= (currentUserName,supevEmp_Num)=>{
    return axios.get(`${baseURL}admin/issupervisor/${currentUserName}/${supevEmp_Num}`)
 }
 export const createNewCourse = (course)=>{
    return axios.post(`${baseURL}admin/createcourse`,course);
 }

 export const AddQuestionToCourse=(question)=>{
    return axios.post(`${baseURL}admin/addquestion`,question)
 }
 export const updateQuestion=(question)=>{
    return axios.post(`${baseURL}admin/updatequestion`,question)
 }
 export const deleteQuestion=(id)=>{
    return axios.delete(`${baseURL}admin/deletequestion/${id}`)
 }
 export const deleteCourse=(id)=>{
    return axios.delete(`${baseURL}admin/deletecourse/${id}`)
 }
 