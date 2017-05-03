function start() {
	var userpos = {
			x: +(document.getElementById("userx").value),
			y: +(document.getElementById("usery").value),
			z: +(document.getElementById("userz").value),
		};
	var height = +(document.getElementById("rheight").value);
	var width = +(document.getElementById("rwidth").value);
	var length = +(document.getElementById("rlength").value);
	console.log("Input Values:", userpos, height, width, length);

	//create vectors
	//Front ABCD there are 8 subvectors 
	//var topright = vector to A, Vector to B, Vector to C
	var vectors_to_face = [
		a_vec = 
		{
			x:0,
			y: Math.abs(height - userpos.y),
			z: Math.abs(length - userpos.z)
		},
		b_vec =
		{
			x: Math.abs(width - userpos.x),
			y: Math.abs(height - userpos.y),
			z: Math.abs(length - userpos.z)
		},
		c_vec = 
		{
			x: Math.abs(width - userpos.x),
			y: 0,
			z: Math.abs(length - userpos.z)
		},
		d_vec = //same as vec_b, but difference in height
		{
			x: Math.abs(width - userpos.x),
			y: Math.abs(height - (height - userpos.y)),
			z: Math.abs(length - userpos.z)
		},
		e_vec = //same as vec_a, but difference in height
		{
			x: 0,
			y: Math.abs(height - (height - userpos.y)),
			z: Math.abs(length - userpos.z)
		},
		f_vec = //same as vec_d, but difference in width
		{
			x: Math.abs(width - (width - userpos.x)),
			y: Math.abs(height - (height - userpos.y)),
			z: Math.abs(length - userpos.z)
		},
		g_vec = //same as vec_c, but difference in width
		{
			x: Math.abs(width - (width - userpos.x)),
			y: 0,
			z: Math.abs(width - userpos.z)
		},
		h_vec = //same as vec_b, but difference in width
		{
			x: Math.abs(width - (width - userpos.x)),
			y: Math.abs(height - userpos.y),
			z: Math.abs(length - userpos.z)
		}
	];
	console.log("Vectors to face", vectors_to_face);
	//normalize vectors
	for (var i in vectors_to_face) {
		vectors_to_face[i] = Vector.unitVector(vectors_to_face[i]);
	}
	//calculate all four solid angles
	sa_tr = calculate_solid_angle(vectors_to_face[0], vectors_to_face[1], vectors_to_face[2]);
	sa_br = calculate_solid_angle(vectors_to_face[2], vectors_to_face[3], vectors_to_face[4]);
	sa_bl = calculate_solid_angle(vectors_to_face[4], vectors_to_face[5], vectors_to_face[6]);
	sa_tl = calculate_solid_angle(vectors_to_face[6], vectors_to_face[7], vectors_to_face[0]);
	//add solid angles 
	solidangle = sa_tr + sa_br + sa_bl + sa_tl;
	console.log("SolidAngleAddition", solidangle);

}

//uses van Oosterom and Strackee 1983
calculate_solid_angle = function (a, b, c) { 
        //triple scalar
        var numerator = Math.abs(Vector.dotProduct(Vector.crossProduct(a,b), c)); //absolute value solves cases when scalar product is negative
        var denominator = (1 + Vector.dotProduct(b,c) + Vector.dotProduct(c,a) + Vector.dotProduct(a,b));
        var answer = (2* Math.atan(numerator/denominator));
        console.log(numerator, denominator);
        if (numerator >= 0 && denominator <= 0) {answer += Math.PI}; //when denominator is negative
        
        return answer;
}

/*	There are 24 cases to handle, four for every face in the room 
	just change height width and length parameter when calling
	They can be handled in pairs. y and 375-y are always constant unless seating
	is taken into account (additional feature).
*/

// Import User Position
/* x-axis values: 
	a = (500-User.Position.x);
	a_2 = (1000-a);
*/
/* y-axis values: 
	b =  centroid;
	b_2 = 375 - centroid;
*/
/* z-axis values: 
	c = (500-User.Position.z);
	c_2 = (1000-a);
*/

/*
Temperature setup
ceiling_temp = ^4;
floor_temp =;
right_temp =;
left_temp =;
front_temp=;
back_temp=;
*/

/* Incident Temperature
	sqrt(1/4)*((ceiling_avg*ceiling_temp)/100+(floor_avg*floor_temp)/100)...
	window.alert(MRT);
*/
