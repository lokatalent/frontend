import React from "react";

interface LocalProps {
	size?: number;
	mt?: number;
	mb?: number;
}

export const Spacer: React.FC<LocalProps> = ({ size = 15, mt = 0, mb = 0 }) => (
	<div style={{ height: size, marginTop: mt, marginBottom: mb }} />
);
