import Card from "@/components/auth/Card";
import React from "react";

const SignUpType = () => {
	return (
    <div className="bg-primaryBg">
      <h1 className="font-bold text-center text-2xl md:text-4xl mb-8">
        What do you want to <br /> sign up as?
      </h1>

      <div className="flex flex-col md:flex-row md:space-x-10 justify-center ">
        <Card
          info="Book trusted home services quickly and easily"
          userType="User"
          buttonText="Sign Up"
          path="signup/user"
        />

        <Card
          info="Offer your expertise and earn flexible income by joining our network"
          userType="Service Provider"
          buttonText="Sign Up"
          path="signup/service-provider"
        />
      </div>
    </div>
  );
};

export default SignUpType;
