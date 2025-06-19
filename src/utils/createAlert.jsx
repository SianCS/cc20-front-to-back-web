import Swal from "sweetalert2"

export const createAlert = (icon,text)=> {
  return Swal.fire({
      title: text || "Something Worng",
      icon: icon || "info",
      timer: 4000
    })
}