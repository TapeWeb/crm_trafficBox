import Swal from "sweetalert2";
import OfferStore from "./offer.store.ts";
import UserStore from "./user.store.ts";

class NotifyStore {

  askRemoveOfferNotify = async (offer: any) => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then(async (result) => {
      if(result.isConfirmed) {
        await OfferStore.removeOffer(offer);
        await Swal.fire({
          title: "Deleted!",
          text: "Your offer has been deleted.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  }

  removeUserNotify = (user: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        UserStore.removeUser(user).then();
      }
    })
  }
}

export default new NotifyStore();