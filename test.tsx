// EditModal.tsx
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import EditForm from "./EditForm";
// import NameResponse from "./NameResponse";
// import Modal from "@/components/ui/modal";
// import { X } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";

// interface RoleSwitchProps {
//   forms: Array<{
//     text: string;
//     label: string;
//   }>;
//   title: string;
// }

// const EditModal: React.FC<RoleSwitchProps> = ({ title, forms }) => {
//   // console.log(forms)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedForm, setSelectedForm] = useState<any>(null);
//   const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
//   const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);


//   console.log(mainModal);
//   const dispatch = useDispatch();

//   const handleEditClick = (form: any) => {
//     setSelectedForm(form);
//     setIsConfirmationModalOpen(true);
//     setIsEditModalOpen(false);

//     // setFormModalOpen(true);
//   };

//   const handleConfirmationClose = () => {
//     setIsConfirmationModalOpen(false);
//     setSelectedForm(null);
//   };

//   return (
//     <>
//       <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
//         <DialogTrigger
//           type="submit"
//           className="text-sm text-primaryBlue hover:border-b pb-0 hover:border-primaryBlue"
//         >
//           Edit
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-xl font-normal mt-5 px-3 text-center">
//               {title}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="flex justify-center items-center">
//             <div className="bg-white rounded-lg w-full max-w-md">
//               <div className="space-divide-y group">
//                 {forms.map((form, index) => (
//                   <div key={index} className="py-4">
//                     <label
//                       htmlFor={`input-${index}`}
//                       className="block text-gray-700 font-medium pb-1"
//                     >
//                       {form.label}
//                     </label>
//                     <input
//                       type="text"
//                       id={`input-${index}`}
//                       value={form.text}
//                       readOnly
//                       className="border-gray-300 border text-textGray3 bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
//                     />
//                     <Button
//                       variant="link"
//                       className="text-primaryBlue px-0 hover:border-none"
//                       onClick={() => handleEditClick(form)}
//                     >
//                       {form.label === "Full Name"
//                         ? "Request name change"
//                         : form.label === "Email"
//                         ? "Change Email Address"
//                         : ""}
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {selectedForm && (
//         <EditForm
//           open={isConfirmationModalOpen}
//           onOpenChange={handleConfirmationClose}
//           form={selectedForm}
//         />
//       )}
//     </>
//   );
// };

// export default EditModal;











////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ------------------ EDITFORM -----------------------//////////////////////////
////////////////////////////////////////////////////////////////////////
// import React, { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";
// import NameResponse from "./NameResponse";
// import { IoWarningOutline } from "react-icons/io5";

// interface FormField {
//   type: "name" | "email";
//   text: string;
// }

// interface EditFormProps {
//   form: FormField;
//   open: boolean;
//   onOpenChange: () => void;
// }

// const EditForm: React.FC<EditFormProps> = ({ form, open, onOpenChange }) => {
//   console.log(open);
//   const [defaultOpen, setDefaultOpen] = useState(open);
//   const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
//   const nameRef = useRef<HTMLInputElement>(null);
//   const reasonRef = useRef<HTMLInputElement>(null);
//   const [nameError, setNameError] = useState("");
//   const [reasonError, setReasonError] = useState("");

//   const validateName = (name: string): boolean => {
//     // Basic name validation: at least two words, only letters and spaces
//     const nameRegex = /^[A-Za-z]+\s[A-Za-z]+(\s[A-Za-z]+)?$/;
//     return nameRegex.test(name);
//   };

//   const validateReason = (reason: string): boolean => {
//     // Check if reason has at least 5 words
//     return reason.trim().split(/\s+/).length >= 5;
//   };

//   const handleContinue = () => {
//     const name = nameRef.current?.value || "";
//     const reason = reasonRef.current?.value || "";

//     let isValid = true;

//     // Validate name if changing name
//     if (form.type === "name") {
//       if (!validateName(name)) {
//         setNameError("Please enter a valid full name (first and last name)");
//         isValid = false;
//       } else {
//         setNameError("");
//       }

//       if (!validateReason(reason)) {
//         setReasonError("Please provide a reason with at least 5 words");
//         isValid = false;
//       } else {
//         setReasonError("");
//       }
//     }

//     // If email, just validate email
//     if (form.type === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(name)) {
//         setNameError("Please enter a valid email address");
//         isValid = false;
//       } else {
//         setNameError("");
//       }
//     }

//     // If all validations pass, open response modal
//     if (isValid) {
//       setIsResponseModalOpen(true);
//       // setDefaultOpen(false);
//     }
//   };

//   return (
//     <>
//       <Dialog open={defaultOpen} onOpenChange={onOpenChange}>
//       {/* <Dialog> */}
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-xl font-normal mt-5 px-3 text-center">
//               Change {form.type}
//             </DialogTitle>
//           </DialogHeader>
//           <div className="flex justify-center items-center">
//             <div className="w-full max-w-md">
//               <div className="space-y-4 divide-y">
//                 <div className="py-4">
//                   <label
//                     htmlFor="fullName"
//                     className="block text-gray-700 font-medium pb-1"
//                   >
//                     {form.type === "name"
//                       ? "Enter New Name"
//                       : "Enter New Email"}
//                   </label>
//                   <input
//                     type="text"
//                     id="fullName"
//                     placeholder={form.text}
//                     ref={nameRef}
//                     className="border-gray-300 border text-black bg-[#FAF8F81C] rounded-md px-4 py-4 text-sm w-full"
//                   />
//                   {nameError && (
//                     <p
//                       className="text-red-500 text-[10px] items-center flex mt-1"
//                       role="alert"
//                     >
//                       <IoWarningOutline
//                         color="red"
//                         size={16}
//                         className="text-red-500 mr-1"
//                       />
//                       {nameError}
//                     </p>
//                   )}
//                 </div>
//                 {form.type === "name" && (
//                   <div className="py-4">
//                     <label
//                       htmlFor="nameReason"
//                       className="block text-gray-700 font-medium pb-1"
//                     >
//                       Tell us why you want to change your name
//                     </label>
//                     <input
//                       type="text"
//                       id="nameReason"
//                       ref={reasonRef}
//                       placeholder="I want to change my name because..."
//                       className="border-gray-300 border h-20 text-black bg-[#FAF8F81C] rounded-md px-4 py-2 w-full"
//                     />
//                     {reasonError && (
//                       <p
//                         className="text-red-500 text-[10px] items-center flex mt-1"
//                         role="alert"
//                       >
//                         <IoWarningOutline
//                           color="red"
//                           size={16}
//                           className="text-red-500 mr-1"
//                         />
//                         {reasonError}
//                       </p>
//                     )}
//                   </div>
//                 )}
//                 <div className="mt-4 flex gap-3">
//                   <DialogClose asChild>
//                     <Button
//                       variant="outline"
//                       className="text-primaryBlue text-sm px-20 py-[1.8rem]"
//                     >
//                       Cancel
//                     </Button>
//                   </DialogClose>
//                   <Button
//                     variant="default"
//                     className="px-8 w-48 py-[1.8rem] text-sm hover:border-none"
//                     onClick={handleContinue}
//                   >
//                     {form.type === "name" ? "Request New Name" : "Continue"}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <NameResponse
//         open={isResponseModalOpen}
//         onOpenChange={() => setIsResponseModalOpen(false)}
//       />
//     </>
//   );
// };

// export default EditForm;



////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// ------------------ NAMERESPONSE -----------------------//////////////////////////
////////////////////////////////////////////////////////////////////////

// components/UserProfile.js
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
// } from "@/components/ui/dialog";

// interface ResponseProps {
//   open: boolean;
//   onOpenChange: () => void;
// }

// const NameResponse: React.FC<ResponseProps> = ({ open, onOpenChange }) => {
//   return (
//     <>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent>
//           {/* <div className="flex justify-center items-center "> */}
//           <div className="flex items-center justify-center ">
//             <div className="bg-white rounded-lg shadow-l w-full max-w-md p-6">
//               <h2 className="text-2xl font-bold mb-4">Response Submitted</h2>
//               <p className="text-gray-600 mb-6">
//                 We will get back to you within 24 hours to let you know the
//                 update on your response. Thank you.
//               </p>
//               <DialogClose asChild>
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
//                   Done
//                 </button>
//               </DialogClose>
//             </div>
//           </div>
//           {/* </div> */}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default NameResponse;


// for talent/profile/page
// "use client";
// import ProfileCompletion from "@/components/profile/ProfileCompletion";
// import ProfileDetails from "@/components/profile/ProfileDetails";
// import { Button } from "@/components/ui/button";
// import { RootStateProfile } from "@/store/profile/profileSlice";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ServiceRate from "@/components/talent/profile/ServiceRate";
// import ReviewCard from "@/components/talent/profile/ReviewCard";
// import PortfolioView from "@/components/talent/profile/PortfolioView";
// import EditServiceRate from "@/components/talent/profile/editing/EditServiceRate";
// import EditPortfolio from "@/components/talent/profile/editing/EditPortfolio";
// import {
//   getBankProfile,
//   getOwnProfile,
// } from "@/services/profileService";
// import { showToast } from "@/store/auth/toastSlice";
// import { getAllService, getService } from "@/services/services";
// import { errorHandler } from "@/lib/utils";
// import { RootStateTalentService, setService } from "@/store/talent/service/TalentServiceSlice";
// import { RootStateTalentProfile, setBankDetailsData } from "@/store/talent/profile/TalentProfileSlice";
// // import { RootStateTalentService, setService } from "@/store/talent/service/TalentServiceSlice";

// interface DataItem {
//   title: string;
//   value: string;
// }

// const reviews = [
//   {
//     name: "Daniella Doe",
//     profileImage: "/Images/review.png",
//     rating: 4,
//     reviewText:
//       "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
//   },
//   {
//     name: "John Smith",
//     profileImage: "/Images/review.png",
//     rating: 5,
//     reviewText: "Amazing experience, highly recommend!",
//   },
// ];

// export default function Profiles() {
//   const dispatch = useDispatch();
//   const profileDetails = useSelector(
//     (state: RootStateProfile) => state.profile.profileDetails
//   );
//   const profilePics = useSelector(
//     (state: RootStateProfile) => state.profile.profilePics
//   );
//   const profileInformation = useSelector(
//     (state: RootStateProfile) => state.profile.information
//   );
//   const bankDetails = useSelector((state: RootStateTalentProfile) => state.talentProfile.bankDetails)
//   const id = useSelector((state: any) => state.auth.user.id);
//   const service = useSelector((state: RootStateTalentService) => state.service.service);
//   // const service1 = useSelector(
//   //   (state: RootStateTalentService) => state.service
//   // );
//   console.log(service, id);
//   // console.log(service1);

//   // Fetch user profile data from the server

//   const [data, setData] = useState([
//     { title: "Name", value: "-" },
//     { title: "Email Address", value: "-" },
//     { title: "Phone Number", value: "-" },
//     { title: "Country", value: "-" },
//     { title: "State", value: "-" },
//     { title: "City", value: "-" },
//     { title: "Address", value: "-" },
//   ]);

//   // const data: DataItem[] = ;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const response = await getOwnProfile();
//       console.log(response);
//       if (response.status === 200) {
//         const profileData = response.data;
//         setData([
//           {
//             title: "Name",
//             value: `${profileData.first_name} ${profileData.last_name}` || "-",
//           },
//           { title: "Email Address", value: profileData.email || "-" },
//           { title: "Phone Number", value: profileData.phone_num || "-" },
//           { title: "Country", value: profileData.country || "-" },
//           { title: "State", value: profileData.state || "-" },
//           { title: "City", value: profileData.city || "-" },
//           { title: "Address", value: profileData.address || "-" },
//         ]);
//       } else if (response.status === 401) {
//         dispatch(
//           showToast({
//             status: "error",
//             message: response.data.message,
//           })
//         );
//       }
//     };

//     fetchProfile();

//     const fetchService = async () => {
//       let temp = {
//         id: id,
//         service_type: 'driving',
//       }
//       // const responseService = await getAllService(id);
//       const response = await getService(temp);
//       console.log(response);
//       if (response.status !== 200) {
//         dispatch(
//           showToast({
//             status: "error",
//             message: errorHandler(response.data),
//           })
//         );
//       } else {
//         dispatch(setService(response.data))
//         // dispatch(updateService(...responseService.data))
//       }
//     };
//     fetchService();

//     const fetchBankDetails = async () => {
//       const response = getBankProfile();
//       console.log(response);
//        if (response.status !== 200) {
//         dispatch(
//           showToast({
//             status: "error",
//             message: errorHandler(response.data),
//           })
//         );
//       } else {

//         dispatch(setBankDetailsData(response.data))
//       }
//     }
//     fetchBankDetails();
//   }, []);

//   const [method, setMethod] = useState("personal");
//   const IserviceRate = {
//     bankName: bankDetails.bank_name,
//     accountNo: bankDetails.account_num,
//     rps: "",
//     rph: "",
//   };
//   const [serviceRate, setServiceRate] = useState(IserviceRate);
//   const handleMethodChange = (method: string) => {
//     setMethod(method);
//   };
//   const [portfolioData1, setPortfolioData1] = useState({
//     experience: service?.experience_years,
//     bio: "John Smith",
//     rate_per_hour: service?.rate_per_hour,
//     skillsSet: {
//       Washing: false,
//       Sweeping: false,
//       Cleaning: service?.service_type === "cleaning",
//       Driving: false,
//       Cooking: false,
//     },
//   });
//   const handleSkillChange = (skill: string, value: boolean) => {
//     setPortfolioData1((prevData) => ({
//       ...prevData,
//       skillsSet: {
//         ...prevData.skillsSet,
//         [skill]: value,
//       },
//     }));
//   };
//   const handleServiceRate = (service) => {
//     console.log(service);
//     setServiceRate(service);
//   };
//   const handlePortfolio = async (service) => {
//     setPortfolioData1((prevSkills) => ({
//       ...prevSkills,
//       experience: service.experience,
//       bio: service.bio,
//     }));
//   };

//   const activeMethod =
//     "rounded-none border-b-2 border-primaryBlue  text-primaryBlue pb-1";

//   return (
//     <div className="ml-8 h-screen sm:ml-0">
//       <div className="h-[10rem] mb-24 w-full bg-gradient-to-r to-[#CCD6B0] from-[#6B705C]">
//         <div className="bg-white  translate-y-1/2 w-[80%] mx-auto rounded-md p-6 flex justify-between items-center">
//           <div className="flex items-center space-x-6">
//             <div className="relative flex items-center justify-center bg-[#C4C4C424] shadow-lg p-2 w-[100px] h-[100px] rounded-full">
//               {profilePics ? (
//                 <Image
//                   src={profilePics}
//                   alt="Profile"
//                   layout="fill"
//                   className="object-cover rounded-[100px]"
//                 />
//               ) : (
//                 <Image
//                   src="/Images/camera.png"
//                   alt="Notification Bing"
//                   width={20}
//                   height={20}
//                 />
//               )}
//               <div className="absolute top-2/4 right-[-10px] flex items-center  justify-center bg-white shadow-lg p-2 w-[30px] h-[30px] rounded-full">
//                 <Image
//                   src="/Images/camera-col.png"
//                   alt="Notification Bing"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//             </div>
//             <p className="text-primaryBlue text-2xl font-bold">
//               {data[0].value}
//             </p>
//           </div>
//         </div>
//         <div></div>
//       </div>

//       <ProfileCompletion
//         addText="You are not done with your profile set up. Complete it now"
//         linkTo="/talent/dashboard/profile/edit"
//       />

//       <div className="card mt-12">
//         <div className="flex items-center mb-8 justify-between">
//           <div className="flex flex-row space-x-6 text-sm">
//             <div>
//               <Button
//                 className={`${
//                   method === "personal" ? activeMethod : ""
//                 } hover:no-underline `}
//                 variant="link"
//                 onClick={() => handleMethodChange("personal")}
//               >
//                 Personal Information
//               </Button>
//             </div>
//             <div>
//               <Button
//                 className={`${
//                   method === "portfolio" ? activeMethod : ""
//                 } hover:no-underline `}
//                 variant="link"
//                 onClick={() => handleMethodChange("portfolio")}
//               >
//                 Portfolio
//               </Button>
//             </div>
//             <div>
//               <Button
//                 className={`${
//                   method === "service" ? activeMethod : ""
//                 } hover:no-underline `}
//                 variant="link"
//                 onClick={() => handleMethodChange("service")}
//               >
//                 Bank Information
//               </Button>
//             </div>
//             <div>
//               <Button
//                 className={`${
//                   method === "reviews" ? activeMethod : ""
//                 } hover:no-underline `}
//                 variant="link"
//                 onClick={() => handleMethodChange("reviews")}
//               >
//                 Reviews
//               </Button>
//             </div>
//           </div>
//           {method === "service" ? (
//             <EditServiceRate serviceRateEdited={handleServiceRate} />
//           ) : method === "portfolio" ? (
//             <EditPortfolio
//               portfolioRateEdited={handlePortfolio}
//               skills={portfolioData1.skillsSet}
//               onSkillChange={handleSkillChange}
//             />
//           ) : null}
//         </div>

//         {method === "personal" ? <ProfileDetails details={data} /> : null}
//         {method === "portfolio" ? (
//           <PortfolioView isData={true} data={portfolioData1} />
//         ) : null}
//         {method === "service" ? (
//           <ServiceRate isData={true} data={serviceRate} />
//         ) : null}
//         {method === "reviews" ? (
//           <div className="card divide-y-[2px] divide-gray-300">
//             {reviews.length > 1 ? (
//               <div>
//                 {reviews.map((review, index) => (
//                   <ReviewCard
//                     key={index}
//                     name={review.name}
//                     profileImage={review.profileImage}
//                     rating={review.rating}
//                     reviewText={review.reviewText}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="flex-center flex-col">
//                 <Image
//                   src={"/Images/emptyReview.png"}
//                   alt="empty Review"
//                   width={200}
//                   height={200}
//                 />
//                 <p>No Reviews yet!!</p>
//               </div>
//             )}
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }


// FOR EDITAVAILABILIY 
// "use client";
// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { FaPen } from "react-icons/fa";

// interface Availability {
//   [key: string]: {
//     isActive: boolean;
//     from: string;
//     to: string;
//   };
// }

// interface EditAvailabilityProps {
//   initialAvailability: Availability;
//   onSave: (availability: Availability) => void;
//   trigger?: boolean;
// }

// const EditAvailability: React.FC<EditAvailabilityProps> = ({
//   initialAvailability,
//   trigger,
//   onSave,
// }) => {
//   const [availability, setAvailability] =
//     useState<Availability>(initialAvailability);
//   const [isDirty, setIsDirty] = useState(false);

//   const handleToggleDay = (day: string) => {
//     setIsDirty(true);
//     setAvailability((prevState) => ({
//       ...prevState,
//       [day]: { ...prevState[day], isActive: !prevState[day].isActive },
//     }));
//   };

//   const handleTimeChange = (
//     day: string,
//     field: "from" | "to",
//     value: string
//   ) => {
//     setIsDirty(true);
//     setAvailability((prevState) => ({
//       ...prevState,
//       [day]: { ...prevState[day], [field]: value },
//     }));
//   };

//   const handleDone = () => {
//     setIsDirty(false);
//     onSave(availability);
//   };

//   const options = ["Weekly", "Monthly"];

//   return (
//     <Dialog>
//       <DialogTrigger>
//         {trigger ? (
//           <p className="underline">Set Availability*</p>
//         ) : (
//           <FaPen color="#3377FF" size={10} />
//         )}
//       </DialogTrigger>

//       <DialogContent className="w-full p-[3rem] max-w-[22rem] sm:max-w-[30rem] lg:max-w-[40rem] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-center">Edit Availability</DialogTitle>
//           <p className="text-[14px] text-center text-[#6C727F]">
//             You will still be able to edit your availability in your profile
//           </p>
//           <p className="text-[14px] text-center text-[#6C727F]">
//             Jobs will be strictly allocated to you based on your available time
//           </p>
//         </DialogHeader>
//         <div className="">
//           <div className="">
//             {Object.keys(availability).map((day) => (
//               <div
//                 key={day}
//                 className="flex items-center justify-between space-x-[7rem] py-2 px-4"
//               >
//                 {/* Day and Toggle */}
//                 <div className="flex items-center w-[5rem] space-x-4">
//                   {/* Toggle Switch */}
//                   <div className="relative inline-block w-12 h-6">
//                     <div
//                       className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors duration-200 ${
//                         availability[day].isActive
//                           ? "bg-blue-500"
//                           : "bg-gray-300"
//                       }`}
//                       onClick={() => handleToggleDay(day)}
//                     >
//                       <div
//                         className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
//                           availability[day].isActive
//                             ? "translate-x-6"
//                             : "translate-x-0"
//                         }`}
//                       ></div>
//                     </div>
//                   </div>
//                   {/* Day Label */}
//                   <label htmlFor={day} className="text-gray-700 font-medium">
//                     {day}
//                   </label>
//                 </div>

//                 {/* Time Inputs or Closed Message */}
//                 {availability[day].isActive ? (
//                   <div className="flex items-center justify-between w-full max-w-lg space-x-6">
//                     {/* From Time Input */}
//                     <div className="flex items-center justify-evenly w-full rounded-md  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                       <span className="text-sm text-gray-500  ">From</span>
//                       <input
//                         type="time"
//                         value={availability[day].from}
//                         onChange={(e) =>
//                           handleTimeChange(day, "from", e.target.value)
//                         }
//                         className="w-ful px-3 py-2 outline-none"
//                       />
//                     </div>
//                     {/* To Time Input */}
//                     <div className="flex items-center justify-evenly w-full rounded-md  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
//                       <label className="text-sm text-gray-500 ">To</label>
//                       <input
//                         type="time"
//                         value={availability[day].to}
//                         onChange={(e) =>
//                           handleTimeChange(day, "to", e.target.value)
//                         }
//                         className="w-ful px-3 py-2 outline-none"
//                       />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-full max-w-lg py-2 px-4 bg-gray-100 text-gray-500 rounded-md">
//                     Closed
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="flex items-center gap-3 my-4">
//             <p>Available to work now</p>
//             <div className="flex items-center space-x-2">
//               <div className="flex items-center">
//                 <input
//                   id="available-yes"
//                   type="radio"
//                   name="available-to-work"
//                   value="yes"
//                   className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <label
//                   htmlFor="available-yes"
//                   className="ml-2 text-sm font-medium text-gray-900"
//                 >
//                   Yes
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="available-no"
//                   type="radio"
//                   name="available-to-work"
//                   value="no"
//                   className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <label
//                   htmlFor="available-no"
//                   className="ml-2 text-sm font-medium text-gray-900"
//                 >
//                   No
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div>
//               <label
//                 htmlFor="bankName"
//                 className="block text-sm font-medium mb-2"
//               >
//                 Repeat(Optional)
//               </label>
//               <select
//                 id="bankName"
//                 name="bankName"
//                 onChange={(e) => console.log(e.target.value)}
//                 className="flex w-full rounded-md bg-white border border-gray-300 h-[3rem] px-3 py-1 text-sm shadow-sm transition-colors "
//               >
//                 {options.map((option) => (
//                   <option
//                     value={option}
//                     key={option}
//                     className="bold leading-none text-violet11 hover:font-bold hover:text-[#3377FF] hover:bg-[#3377FF3D] rounded-[7px]"
//                   >
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-center mt-4">
//             <DialogClose asChild>
//               <button
//                 className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
//                 onClick={handleDone}
//               >
//                 Done
//               </button>
//             </DialogClose>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditAvailability;
