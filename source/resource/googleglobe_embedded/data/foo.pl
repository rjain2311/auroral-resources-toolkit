#!/usr/bin/env perl

open MAGS, "<", "mags" or die $!;
open MAGSN, "<", "magsnormd" or die $!;

close(MAGS);
close(MAGSN);
