package  utils.math {
	
	public function log10Scale(x:Number, d0:Number, d1:Number, r0:Number, r1:Number):Number {
		// f(x) = (log(x) - log(d0)) / (log(d1) - log(d0)) * (r1 - r0) + r0
		return (Math.log(x) - Math.log(d0)) / (Math.log(d1) - Math.log(d0)) * (r1 - r0) + r0;
	}
}
