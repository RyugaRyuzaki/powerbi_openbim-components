import { Color } from "three";

export const LightColor = {
	light: 0x404040,
	normalCube: new Color( "rgb(255, 255, 255)" ),
	hoverCube: new Color( "rgb(14, 237, 51)" ),
	textCube: new Color( "rgb(255, 0, 0)" ),
	refPlan: new Color( "rgb(245, 245, 245)" ),
	ring: new Color( "rgb(255, 0, 0)" ),
};
export function getColorRGB( r, g, b ) {
	const color = new Color();
	color.r = r;
	color.g = g;
	color.b = b;
	return color;
}
