// // import React from "react";
// // import useAxiosSecure from "../Hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";
// // import Loader from "../Components/Loader";

// // const ClubRequest = () => {
// //   const axiosSecure = useAxiosSecure();

// //   const {
// //     data: clubRequests,
// //     isLoading,
// //     refetch,
// //   } = useQuery({
// //     queryKey: ["all-club-requests"],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get("/club-requests");

// //       return res.data;
// //     },
// //   });

// //   if (isLoading) {
// //     return <Loader></Loader>;
// //   }

// //   return (
// //     <div>
// //       <p>Club Requests {clubRequests.length}</p>

// //       <div className="overflow-x-auto">
// //         <table className="table">
// //           {/* head */}
// //           <thead>
// //             <tr>
// //               <th>Request No</th>
// //               <th>Name</th>
// //               <th>Club Type</th>
// //               <th>Email</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {clubRequests.map((request, index) => {
// //               console.log(request);
// //               return (
// //                 <tr>
// //                   <th>{index + 1}</th>
// //                   <td>{request.clubName}</td>
// //                   <td>{request.clubType}</td>
// //                   <td>{request.email}</td>
// //                   <td>{request.status}</td>
// //                   <td className="">
// //                     <button className="btn btn-sm mr-2 text-white btn-success">
// //                       Approved
// //                     </button>
// //                     <button className="btn btn-sm text-white btn-error">
// //                       Reject
// //                     </button>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //             {/* row 1 */}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClubRequest;
// import React from "react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import Loader from "../Components/Loader";
// import Swal from "sweetalert2";
// import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa"; // কিছু আইকন যোগ করা হলো

// const ClubRequest = () => {
//   const axiosSecure = useAxiosSecure();

//   // --- QUERY: ক্লাব রিকোয়েস্ট ফেচ করা ---
//   const {
//     data: clubRequests = [],
//     isLoading,
//     refetch, // ✅ ডেটা রিফ্রেশ করার জন্য refetch ফাংশনটি নেওয়া হলো
//   } = useQuery({
//     queryKey: ["all-club-requests"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/club-requests");
//       return res.data;
//     },
//   });

//   // --- MUTATION: অনুমোদন (Approve) লজিক ---
//   const approveMutation = useMutation({
//     mutationFn: (id) => {
//       // ✅ Backend Route: PATCH /club-requests/approve/:id
//       return axiosSecure.patch(`/club-requests/approve/${id}`);
//     },
//     onSuccess: () => {
//       Swal.fire({
//         title: "অনুমোদিত! 🎉",
//         text: "ক্লাব অনুরোধটি অনুমোদিত হয়েছে এবং ক্লাবটি প্রকাশিত হয়েছে।",
//         icon: "success",
//       });
//       refetch(); // ✅ সফল হওয়ার সাথে সাথেই ডেটা রিফ্রেশ করা হবে
//     },
//     onError: (error) => {
//       Swal.fire({
//         title: "ভুল!",
//         text: error.response?.data?.message || "অনুমোদন ব্যর্থ হয়েছে।",
//         icon: "error",
//       });
//     },
//   });

//   // --- MUTATION: বাতিল (Reject) লজিক ---
//   const rejectMutation = useMutation({
//     mutationFn: (id) => {
//       // ✅ Backend Route: PATCH /club-requests/reject/:id (আপনার ব্যাকএন্ডে এই রুট তৈরি করতে হবে)
//       return axiosSecure.patch(`/club-requests/reject/${id}`);
//     },
//     onSuccess: () => {
//       Swal.fire({
//         title: "বাতিল! 🗑️",
//         text: "ক্লাব অনুরোধটি বাতিল করা হয়েছে।",
//         icon: "info",
//       });
//       refetch(); // ✅ সফল হওয়ার সাথে সাথেই ডেটা রিফ্রেশ করা হবে
//     },
//     onError: (error) => {
//       Swal.fire({
//         title: "ভুল!",
//         text: error.response?.data?.message || "বাতিলকরণ ব্যর্থ হয়েছে।",
//         icon: "error",
//       });
//     },
//   });

//   // --- হ্যান্ডলার ফাংশন ---
//   const handleApprove = (id) => {
//     Swal.fire({
//       title: "নিশ্চিত?",
//       text: "আপনি কি এই ক্লাব অনুরোধটি অনুমোদন করতে চান?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#10B981",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "হ্যাঁ, অনুমোদন করুন!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         approveMutation.mutate(id);
//       }
//     });
//   };

//   const handleReject = (id) => {
//     Swal.fire({
//       title: "নিশ্চিত?",
//       text: "আপনি কি এই ক্লাব অনুরোধটি বাতিল করতে চান?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#EF4444",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "হ্যাঁ, বাতিল করুন!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         rejectMutation.mutate(id);
//       }
//     });
//   };

//   // --- লোডিং এবং মিউটেশন পেন্ডিং স্টেট ---
//   if (isLoading || approveMutation.isPending || rejectMutation.isPending) {
//     return <Loader></Loader>;
//   }

//   // --- মেইন রেন্ডার ---
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-extrabold text-primary mb-8 border-b pb-2">
//         ক্লাব অনুরোধসমূহ ({clubRequests.length})
//       </h2>

//       {clubRequests.length === 0 ? (
//         <p className="text-center p-12 text-xl text-gray-500 bg-white rounded-lg shadow-md">
//           কোনো নতুন ক্লাব অনুরোধ পাওয়া যায়নি।
//         </p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
//           <table className="table w-full table-zebra">
//             {/* Table Head: উন্নত ডিজাইন */}
//             <thead>
//               <tr className="bg-primary text-white text-base font-semibold">
//                 <th>#</th>
//                 <th>ক্লাবের নাম</th>
//                 <th>ক্লাবের প্রকার</th>
//                 <th>ম্যানেজার ইমেইল</th>
//                 <th>স্ট্যাটাস</th>
//                 <th className="text-center">অ্যাকশন</th>
//               </tr>
//             </thead>

//             {/* Table Body */}
//             <tbody>
//               {clubRequests.map((request, index) => {
//                 // স্ট্যাটাস যদি 'pending' না হয়, তবে isProcessed হবে true
//                 const isProcessed = request.status !== "pending";

//                 // স্ট্যাটাস ব্যাজের জন্য কন্ডিশনাল স্টাইল
//                 let statusBadgeClass = "badge-warning";
//                 if (request.status === "approved") {
//                   statusBadgeClass = "badge-success";
//                 } else if (request.status === "rejected") {
//                   statusBadgeClass = "badge-error";
//                 }

//                 return (
//                   <tr
//                     key={request._id}
//                     className={
//                       isProcessed
//                         ? "hover:bg-gray-100"
//                         : "hover:bg-yellow-50/50"
//                     }
//                   >
//                     <th>{index + 1}</th>
//                     <td className="font-medium text-lg">{request.clubName}</td>
//                     <td>{request.clubType}</td>
//                     <td>{request.email}</td>
//                     <td>
//                       {/* ✅ রিয়েল-টাইম স্ট্যাটাস পরিবর্তন */}
//                       <span
//                         className={`badge badge-lg font-bold text-white ${statusBadgeClass}`}
//                       >
//                         {request.status.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="text-center">
//                       <div className="flex justify-center space-x-2">
//                         <button className="btn btn-sm btn-info text-white">
//                           <FaEye /> বিস্তারিত
//                         </button>

//                         {/* ✅ Approve বাটন: স্ট্যাটাস অনুযায়ী ডিসেবল */}
//                         <button
//                           onClick={() => handleApprove(request._id)}
//                           className="btn btn-sm text-white btn-success"
//                           disabled={isProcessed}
//                         >
//                           <FaCheckCircle /> Approve
//                         </button>

//                         {/* ✅ Reject বাটন: স্ট্যাটাস অনুযায়ী ডিসেবল */}
//                         <button
//                           onClick={() => handleReject(request._id)}
//                           className="btn btn-sm text-white btn-error"
//                           disabled={isProcessed}
//                         >
//                           <FaTimesCircle /> Reject
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClubRequest;
import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";

const ClubRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: clubRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-club-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/club-requests");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id) => {
      return axiosSecure.patch(`/club-requests/approve/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Approved! 🎉",
        text: "Club request approved and club published successfully.",
        icon: "success",
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to approve the club request.",
        icon: "error",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => {
      return axiosSecure.patch(`/club-requests/reject/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Rejected! 🗑️",
        text: "Club request has been rejected.",
        icon: "info",
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message || "Failed to reject the club request.",
        icon: "error",
      });
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve and publish this club?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this club request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading || approveMutation.isPending || rejectMutation.isPending) {
    return <Loader />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-primary mb-8 border-b pb-2">
        Club Requests ({clubRequests.length})
      </h2>

      {clubRequests.length === 0 ? (
        <p className="text-center p-12 text-xl text-gray-500 bg-white rounded-lg shadow-md">
          No pending club requests found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-2xl border border-gray-200">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="bg-primary text-white text-base font-semibold">
                <th>#</th>
                <th>Club Name</th>
                <th>Club Type</th>
                <th>Manager Email</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clubRequests.map((request, index) => {
                const isProcessed = request.status !== "pending";

                let statusBadgeClass = "badge-warning";
                if (request.status === "approved") {
                  statusBadgeClass = "badge-success";
                } else if (request.status === "rejected") {
                  statusBadgeClass = "badge-error";
                }

                return (
                  <tr
                    key={request._id}
                    className={
                      isProcessed
                        ? "hover:bg-gray-100"
                        : "hover:bg-yellow-50/50"
                    }
                  >
                    <th>{index + 1}</th>
                    <td className="font-medium text-lg">{request.clubName}</td>
                    <td>{request.clubType}</td>
                    <td>{request.email}</td>
                    <td>
                      <span
                        className={`badge badge-lg font-bold text-white ${statusBadgeClass}`}
                      >
                        {request.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="btn btn-sm text-white btn-success"
                          disabled={isProcessed}
                        >
                          <FaCheckCircle /> Approve
                        </button>

                        <button
                          onClick={() => handleReject(request._id)}
                          className="btn btn-sm text-white btn-error"
                          disabled={isProcessed}
                        >
                          <FaTimesCircle /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClubRequest;
