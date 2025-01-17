import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,

  DialogTitle,

} from "@/components/ui/dialog";
// import { LiaSlidersHSolid } from "react-icons/lia";

// interface FilterDialog {
//   customerName: string;
//   customerImage: string;
//   talentName: string;
//   talentImage: string;
// }

export default function FilterDialog() {
  return (
    <Dialog>
      <DialogTrigger className="">
        <div
          className="w-12 h-12 rounded-lg"
          style={{
            backgroundColor: "#Fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#E5E7EB",
            borderWidth: "1px",
          }}
        >
          {/* <LiaSlidersHSolid /> */}
        </div>
      </DialogTrigger>
      <DialogContent className="w-full p-[3rem] max-w-[40rem]">
        <DialogHeader>
          <DialogTitle className="text-center">ssssser</DialogTitle>
        </DialogHeader>
        <div className="w-full gap-6 flex flex-col gap-[2rem]">
          <div className="py-3 border-b border-gray-200">
            <button className="flex justify-between items-center w-full text-left">
              <span className="text-gray-700">labyftuuftfel</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
