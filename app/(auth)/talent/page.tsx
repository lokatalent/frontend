import Card from "@/components/auth/Card";
import React from "react";

const SignUpType = () => {
	return (
		<div className="py-14 ">
			<h1 className="font-bold text-center text-2xl md:text-4xl mb-8">
				What do you want to <br /> sign up as?
			</h1>

			<div className="flex flex-col md:flex-row md:space-x-10 justify-center ">
				<Card
					info="As a user, you will be able to lorem ipsumlo lorem ipsum"
					userType="User"
					buttonText="Sign Up"
					path="talent/signup/user"
				/>

				<Card
					info="As a service provider, you will be able to lorem ipsumlo lorem ipsum "
					userType="Service Provider"
					buttonText="Sign Up"
					path="talent/signup/service-provider"
				/>
			</div>
		</div>
	);
};

export default SignUpType;
