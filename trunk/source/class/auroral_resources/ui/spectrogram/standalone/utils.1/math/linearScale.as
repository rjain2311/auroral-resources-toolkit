package  utils.math {
	
	public function linearScale(x:Number, d0:Number, d1:Number, r0:Number, r1:Number):Number {
		// f(x) = (x - d0) / (d1 - d0) * (r1 - r0) + r0
		return (x - d0) / (d1 - d0) * (r1 - r0) + r0;
	}
}
