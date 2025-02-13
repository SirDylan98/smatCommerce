import axios from "axios";


const baseURL = "http://localhost:8086/api/v1/"    // Dev Env
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
export const getProgressCourseList=(employeeId)=>{
    return axios.get(`${baseURL}getprogressresult/${employeeId}`)
}
export const getMyResults=(employeeId)=>{
    return axios.get(`${baseURL}getmyresults/${employeeId}`)
}
export const getQuizQuestion=(courseId)=>{
    return axios.get(`${baseURL}getcoursequestions/${courseId}`)
}
export const getallcourses=()=>{
    return axios.get(`${baseURL}getallcourses`)
}
export const getEmployeeDetails=(employeeNumber)=>{
    return axios.get(`${baseURL}getemployeedetails/${employeeNumber}`)
}
//getemployeeusername
export const getEmployeeUserName=(employeeNumber)=>{
    return axios.get(`${baseURL}getemployeeusername/${employeeNumber}`)
}
export const saveCourseResults=(score)=>{
    return axios.post(`${baseURL}submitquizresults/`,score);
    
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
 