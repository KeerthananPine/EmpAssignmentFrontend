import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"; //importing createSlice,createAsyncThunk from redux


const initialState = {
    empList:[], // stores all data
    selectedEmp:[]  //stores selected data
}

const BASE_URL = 'https://test123.pineappleai.cloud/api/employee'

//GET
{/*this _ means no argument is expecteed, rejectWithValue is a thunk property */}
{/*fetch the data from database*/}
export const getEmpFromServer = createAsyncThunk(
    "employee/getEmpFromServer",
    async (_,{rejectWithValue}) => {
        const response = await fetch(BASE_URL)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({error:'No Employee Details Found'})
        }
    }
)

// POST
{/*creataes a async thunk called addEmpToServer*/}
 {/*we will upload task so we have object named task, rejectWithValue is a thunk property */}
export const addEmpToServer = createAsyncThunk(
  'employee/addEmpToServer',
  async (formData) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  }
);

// Update
{/*creataes a async thunk called updateEmpInServer*/}
{/*fetch the data by id from database*/}
{/*we will upload emp so we have object named emp, rejectWithValue is a thunk property */}
export const updateEmpInServer = createAsyncThunk(
  'employee/updateEmpInServer',
  async ({ id, formData }) => {
    const response = await fetch(BASE_URL + '/' + id, {
      method: 'PATCH',
      body: formData,
    });
    return await response.json();
  }
);

//DELETE 
{/*creataes a async thunk called deleteEmpFromServer*/}
{/*we will delete emp so we have object named emp, rejectWithValue is a thunk property */}
export const deleteEmpFromServer = createAsyncThunk(
  "employee/deleteEmpFromServer",
  async (emp, { rejectWithValue }) => {
      const response = await fetch(BASE_URL + '/' + emp._id, {
        method: 'DELETE',
      });

      // Handle HTTP errors
      if (response.ok) {
        // Attempt to parse error message from server
        const jsonResponse = await response.json();
        return jsonResponse;
      } else{
            return rejectWithValue({error:'Employee detail Not Deleted'})
      }
  }
);

const empSlices = createSlice({
    name:'empSlices',
    initialState,
    reducers:{
        removeEmpFromList:(state,action) => {
            state.empList = state.empList.filter((emp) => emp.id !== action.payload.id)
        },
        setSelectedEmp:(state,action) =>{
            state.selectedEmp = action.payload
        }

    },
    extraReducers:(builder) => {
        builder
            .addCase(getEmpFromServer.pending,(state) => {   {/*Belongs to get, req pending case*/}
                state.isLoading = true
            })
            .addCase(getEmpFromServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.empList = action.payload
            })
            .addCase(getEmpFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.empList = []
            })


            .addCase(addEmpToServer.pending,(state) => {   {/*Belongs to POST, req pending case*/}
                state.isLoading = true;   {/*API Call*/}
            })
            .addCase(addEmpToServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = '';  {/*if fullfilled no error*/}
                state.empList.push(action.payload);   {/*req fullfilled so empList will get data*/} 
            })
            .addCase(addEmpToServer.rejected,(state,action) => {  {/*rejected Case*/}
                state.error = action.payload.error
                state.isLoading = false;    {/*req rejected so empList will not get data*/}
            })


            .addCase(updateEmpInServer.pending,(state) => {   {/*Belongs to UPDATE, req pending case*/}
                state.isLoading = true
            })
            .addCase(updateEmpInServer.fulfilled,(state,action) => {
                state.isLoading = false
                state.error = ''
                state.empList = state.empList.map((emp) => emp._id === action.payload._id ? action.payload : emp )
            })
            .addCase(updateEmpInServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })


            .addCase(deleteEmpFromServer.pending,(state) => {  {/*Belongs to DELETE, req pending case*/}
                state.isLoading = true
            })
            .addCase(deleteEmpFromServer.fulfilled,(state) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deleteEmpFromServer.rejected,(state,action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
    }
})

export const{addEmptoList,removeEmpFromList,updateEmpInList,setSelectedEmp} = empSlices.actions
export default empSlices.reducer