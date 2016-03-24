
 { "fresh audio"
 	{ "audio playback"
        {  } 
	} 
    { "audio effects"
        {  fresh/fx.bitcrush~ fresh/fx.chorus~ fresh/fx.delaydub~ fresh/fx.distortion~ fresh/fx.freeverb~ fresh/fx.fuzz~ fresh/fx.grainbash~ fresh/fx.karplus~ fresh/fx.omnifilter~ fresh/fx.streamstretch~ fresh/fx.stutter~ fresh/fx.vocoder~ fresh/fx.volattack~ fresh/fx.wobble~ } 
	} 
	{ "audio mixing"
        {  fresh/mix.between~ fresh/mix.dynadc~ fresh/mix.dyncatch~ fresh/mix.dynthrow~ fresh/mix.output~ fresh/mix.recorder~ } 
	} 
	{ "audio synthesizers"
        {  fresh/mix.between~ fresh/mix.dynadc~ fresh/mix.dyncatch~ fresh/mix.dynthrow~ fresh/mix.output~ } 
	} 
}

{ "fresh video"
	{ "video playback" 
		{ fresh/vid.player fresh/vid.player~ fresh/vid.playerbuf fresh/vid.playerbuf~ fresh/vid.image }  
	}  
	{ "video effects" 
		{ fresh/vfx.gain fresh/vfx.glitch }  
	}  
	{ "video mixing"
		{ fresh/vid.window fresh/vid.recorder } 
	}
    { "video synthesizers"  
		{ fresh/vid.syn.snd2vid fresh/vid.syn.fire fresh/vid.syn.sparks }  
	} 
	{ "video track-and-map"  
		{ fresh/vid.mapper fresh/vid.trackbg }  
	} 
	{ "video text"  
		{ fresh/vid.text }  
	} 
	
}

{ "fresh control"
	{ "lists" 
		{  fresh/lst.collect fresh/lst.collection fresh/lst.delimit fresh/lst.drip fresh/lst.replace }  
	}  
    { "bang"  
		{  fresh/bng.once fresh/bng.block fresh/bng.bngx fresh/bng.nobang fresh/bng.pass }  
	}  
	{ "files"
		{ fresh/file.audioload fresh/file.autoarrays fresh/file.filefolder fresh/file.filepath fresh/file.randomline fresh/file.swapext} 
	}
}
 

{ "control" 
	{ "conditionals"
		{  sel moses change  } 
	} 
	{ "flip"  
		{  reverse abs }  
	}  
	{ "do once"  
		{  fresh/bng.once onebang  }  
	}  
	{ "iterate"
		{ cxc_counter } 
	}
}  

{ "operations"
	{ "simple math"
		{ "+" "-" "*" "/" ">" ">=" "=" "!=" "=<" "<" "%"  } 
	} 
	{ "higher math"
		{random sin cos tan atan atan2 exp log abs sqrt pow acos asin } 
	} 
	{ "logic"
		{ "&" "|" "&&" "||" ">>" "<<" } 
	} 
	{ "mapping"
		{  amplitude_n autoscale breakpoint center_point circular cubic_seat circular_sigmoid curve_log } 
	} 
} 

{  "file management"  
	{ "gui"
		{ openpanel savepanel mp3write~ pix_record } 
	} 
} 
 
{ "data conversion"  
	{ "lists"  
		{ tolist } 
	} 
	{ "cartesian" 
		{ cartesian2sperical mapping/vector } 
	} 
	{ "polar" 
		{ mapping/polar2cartesian pol2sph pol2rec~ } 
	} 
	{ "ascii"
		{ atoi makefilename prepend_ascii splitfilename } 
	} 
	{  "integer"  
		{  itoa int list2int } 
	} 
	{ "symbol"
		{ iem_symtoalist fromsymbol tosymbol } 
	} 
	{ "limit data"
		{ clip~ edge~ }  
	} 
	{ "midi"
		{ mtof midiformat midiparse }  
	} 
	{ "frequency"
		{ ftom } 
	} 
	{ "smoothing"
		 { autoscale smooth speedlimiter- line } 
	} 
}

{ "audio"
	{ "audio output"
		{ output~ ezdac~ }
	} 
	{ "audio input"
		{ adc~ } 
	} 
	{ "transitions"
		{ curve_fade  } 
	} 
	{ "effects"
		{ hip~ lop~ beatify~ svf~ filterortho~ comb~}  
	} 
	{ "analysis"
		{ bonk~ sigmund~ fiddle~ bfft~} 
	}
} 

{ "video"
	{ "controls"
		{ playlist~ pix_film gemWin } 
	} 
	{ "effects"
		{ pix_kaleidoscope pix_refraction pix_alpha }  
	}
} 
 
{ "communication"
	{ "OSC"
		{ sendOSC dumpOSC routeOSC} 
	} 
	{ "web"
		{ mp3amp~ mp3cast~ udpsend udpreceive tcpsend tcpreceive} 
	} 
	{ "networking"
		{maxlib/netserver maxlib/netclient netreceive netsend}
	}
}

{ "3D"
	{ "primitives"
		{ sphere cube polygon curve } 
	} 
	{ "particle systems"
		{ part_head part_velocity part_source part_killiod part_draw } 
	} 
	{ "camera"
		{ ch_gemwin } 
	} 
	{ "lights"
		{ world_light "world_light 101" light} 
	} 
}

{ "drawing"
	{ "shapes"
		{ rectangle circle polygon triangle } 
	} 
	{ "text"
		{ text3d text } 
	}  
	{ "in the patch"
		{table array mapping/timeroll}
	}
 }

 { "input"
	{ "computer"
		{ cursor keyname  ambient_light_sensor }  
	} 
	{ "peripherals"
		{ hid gemmouse gemkeyboard } 
	} 
} 
