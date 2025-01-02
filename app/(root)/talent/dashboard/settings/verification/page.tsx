"use client";

function Verification() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="doc_type">Address Verification*</label>
        <select className="h-20 w-full max-w-3xl px-5 rounded-md focus:outline-none" name="doc_type" id="">
          <option value="">Select one</option>
          <option value="electricity">Electricity Bill</option>
          <option value="utility">Utility Bill</option>
          <option value="tenancy">Tenancy of Agreement</option>
          <option value="bank-statement">Bank statement with address</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="doc_type">ID Type*</label>
        <select className="h-20 w-full max-w-3xl px-5 rounded-md focus:outline-none" name="doc_type" id="">
          <option value="">Select one</option>
          <option value="nin">National Identity Number</option>
          <option value="passport">International Passport</option>
          <option value="id">National ID Card</option>
          <option value="licence">Drivers License</option>
          <option value="voters-card">Voters Card</option>
        </select>
      </div>
      <button className="btnOne max-w-[600px] mt-5">Next</button>
    </div>
  );
}

export default Verification;
