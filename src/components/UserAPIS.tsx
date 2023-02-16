export{}
import axios from "axios";
import React from "react";
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

interface Employee{
    Id:string;
    Name:string;
    Country:string;
    AnnualIncome:number;
    EmailIdsList:Array<string>;

};
function UserAPIS()
{
const [Id, setId] = React.useState<string>("");
const [Name, setName] = React.useState<string>("");
const [Country, setCountry] = React.useState<string>("");
const [AnnualIncome, setAnnualIncome] = React.useState<number>(0);
const [EmailIdsList,setEmailIdslist] = React.useState<Array<string>>([]);
const [Employees, setEmployees] = React.useState<Array<Employee>>([]);
React.useEffect(() => {
    (async () => await Get())();
  }, []);
  async function Get() {
    
    const res = await axios.get("https://localhost:7012/api/Employee");
    setEmployees(res.data);
    console.log(res.data);
  }
  async function Post(event :React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7012/api/Employee", {
        Id : "",
        Name: Name,
        Country: Country,
        AnnualIncome: AnnualIncome,
        EmailIdsList : ["email"]
      
      });
      alert("Employee Added Successfully");
          setId("");
          setName("");
          setCountry("");
          setAnnualIncome(0);
          setEmailIdslist([]);
      
    
      Get();
    } catch (error) {
      alert(error);
    }
  }
  async function Patch(employee: Employee ) {
    setId(employee.Id);
    setName(employee.Name);
    setCountry(employee.Country);
    setAnnualIncome(employee.AnnualIncome);
    setEmailIdslist(employee.EmailIdsList);
  }
  async function Delete(Id :string) {
    await axios.delete("https://localhost:7012/api/Employee" + Id);
     alert("Employee Data deleted Successfully");
     setId("");
     setName("");
     setCountry("");
     setAnnualIncome(0);
     setEmailIdslist([]);
     Get();
    }
    async function Update(event:React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        try {
     
      await axios.put("https://localhost:7012/api/Employee",
     
     
            {
            Id: " ",
            Name: Name,
            Country: Country,
            AnnualIncome: AnnualIncome,
            EmailIdsList:["email"]
    
     
            }
          );
          alert("Employee Details Updated");
          setId("");
          setName("");
          setCountry("");
          setAnnualIncome(0);
          setEmailIdslist([]);
        
          Get();
        } catch (error) {
          alert(error);
        }
      }
      return (
        <div>
          <h1>Employee Details</h1>
        <div className="container mt-4">
          <form>
            <div className="form-group">
            
              <input
                type="text"
                className="form-control"
                id="Id"
                hidden
                value={Id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
   
              <label>Employee Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                value={Name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            
            <div className="form-group">
              <label>Employee Country</label>
              <input
                type="text"
                className="form-control"
                id="Country"
                value={Country}
  
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Annual Income</label>
              <input
                type="number"
                className="form-control"
                id="AnnualIncome"
                value={AnnualIncome}
  
                onChange={(event) => {
                  setAnnualIncome(event.target.valueAsNumber);
                }}
              />
            </div>
            <div className="form-group">
              <label>EmailIdLists</label>
              <input
                type="text" 
                className="form-control"
                id="EmailIdLists"
                value={EmailIdsList}
  
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
              />
            </div>
            <div>
              <button className="btn btn-primary mt-4" onClick={Post}>
                Register new employee details
              </button>
              <button className="btn btn-warning mt-4" onClick={Update}>
                Update the employee details
              </button>
            </div>
          </form>
        </div>
        <br></br>
   
        <table className="table table-dark" align="center">
          <thead>
            <tr>
              <th scope="col">Employee Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Country</th>
              <th scope="col">AnnualIncome</th>
              <th scope="col">EmailIdLists</th>
          
              <th scope="col">Option</th>
            </tr>
          </thead>
          {Employees.map(function fn(employee:Employee) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{employee.Id} </th>
                  <td>{employee.Name}</td>
                  <td>{employee.Country}</td>
                  <td>{employee.AnnualIncome}</td>
                  <td>{employee.EmailIdsList}</td>
                  
                  
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => Patch(employee)}
                    >
                      Edit employee details
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => Delete(employee.Id)}
                    >
                      Delete employee details
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
          
        </div>
      );
}
export default UserAPIS;
