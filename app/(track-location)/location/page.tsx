import { Input } from "@/components/ui/input";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const page = () => {
	return (
		<div className="flex flex-col justify-center contained mx-auto">
			<div>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/docs/components">
								Components
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<h1 className="header">Where do you need help</h1>
			<Input
				type="email"
				placeholder="Email"
				className="bg-white p-2"
			/>
			
		</div>
	);
};

export default page;
