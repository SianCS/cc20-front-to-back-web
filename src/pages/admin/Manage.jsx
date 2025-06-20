import React, { useEffect, useState } from "react";
import { actionDeleteUser, actionListUser, actionUpdateRole } from "../../api/user";
import useAuthStore from "../../store/auth-store";
import { createAlert } from "../../utils/createAlert";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";

function Manage() {
  const token = useAuthStore((state) => state.token);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      const res = await actionListUser(token);
      setUsers(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlUpdateRole = async (token, id, role) => {
    console.log(token, id, role);
    try {
      const res = await actionUpdateRole(token, id, { role });
      console.log(res);
      createAlert("success", res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlDeleteUser = async (token, id) => {
   const {isConfirmed} = await Swal.fire({
      icon: "question",
      text: "Are you sure ?",
      showCancelButton: true,
      showCloseButton: true
    });
    if(isConfirmed) {
      try {
        const res = await actionDeleteUser(token,id)
        console.log(res)
        createAlert("success", res.data.message)
        fetchUser()
      } catch (error) {
        console.log(error)
      }
    }
  };


  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>

                <td>
                  <select
                    defaultValue={item.role}
                    onChange={(e) =>
                      hdlUpdateRole(token, item.id, e.target.value)
                    }
                  >
                    <option>USER</option>
                    <option>ADMIN</option>
                  </select>
                </td>

                <td>
                  <Trash 
                  color="red" 
                  onClick={()=> hdlDeleteUser(token, item.id)} 
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Manage;
