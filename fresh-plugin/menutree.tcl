
 { "fresh audio"
 	{ "audio playback"
        {  fresh/snd.player~ fresh/snd.phaseloop~ fresh/snd.slicebonk~~} 
	} 
    { "audio effects"
        {  fresh/fx.bitcrush~ fresh/fx.chorus~ fresh/fx.delaydub~ fresh/fx.distortion~ fresh/fx.freeverb~ fresh/fx.fuzz~ fresh/fx.grainbash~ fresh/fx.karplus~ fresh/fx.omnifilter~ fresh/fx.streamstretch~ fresh/fx.stutter~ fresh/fx.vocoder~ fresh/fx.volattack~ fresh/fx.wobble~ } 
	} 
	{ "audio mixing"
        {  fresh/mix.between~ fresh/mix.dynadc~ fresh/mix.dyncatch~ fresh/mix.dynthrow~ fresh/mix.output~ fresh/mix.recorder~ } 
	} 
	{ "audio equillization"
        {  fresh/snd.eq.compressor~ fresh/snd.eq.punch~ fresh/snd.eq.riaa~ } 
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

{ "-" }

{ "vanilla" 
	{ "glue"
		{  bang float symbol int send receive select route pack unpack trigger spigot moses until print makefilename change swap value  } 
	} 
	{ "time"  
		{  delay metro line timer cputime realtime pipe }  
	}
	{ "tables"  
		{ tabread tabread4 tabwrite soundfiler}  
	}
	{ "subwindows"  
		{ pd table inlet outlet inlet~ outlet~}  
	}
	{ "data templates"  
		{ struct drawcurve filledcurve drawpolygon filledpolygon plot drawnumber}  
	}
	{ "accessing data"  
		{ pointer get set element getsize setsize append sublist}  
	}
	{ "input output"  
		{ loadbang openpanel savepanel key keyup keyname}  
	} 
	{ "networks"  
		{ netsend netreceive}  
	} 
	{ "storage"  
		{ qlist textfile bag poly}  
	} 
} 

{ "vanilla math" 
	{ "arithmetic"
		{  + - * / pow  } 
	} 
	{ "relational tests"  
		{  == != > < >= <= }  
	}
	{ "bit twiddling"
		{  & && ||| %  }  
	}  
	{ "convert acoustical units"
		{  mtof ftom powtodb rmstodb dbtopow dbtorms}  
	}  
	{ "higher math"
		{ mod div sin cos tan atan atan2 sqrt log exp abs} 
	}
	{ "lower math"
		{ random expr } 
	}
	{ "greater or lesser of 2 numbers"
		{ max min } 
	}
	{ "force a number into a range"
		{ clip } 
	}
} 

{ "vanilla midi" 
	{ "midi input"
		{  notein ctlin pgmin bendin touchin polytouchin midiin sysexin  } 
	} 
	{ "convert acoustical units"  
		{  mtof~ ftom~ rmstodb~ dbtorms~ rmstopow~ powtorms~ }  
	}
} 

{ "vanilla audio" 
	{ "glue"
		{  dac~ adc~ sig~ line~ vline~ threshold~ snapshot~ vsnapshot~ bang~ samplerate~ send~ receive~ throw~ cathc~ block~ switch~ readsf~ writesf~  } 
	} 
	{ "oscillators and tables"  
		{  phasor~ cos~ osc~ tabwrite~ tabplay~ tabread~ tabread4~ tabosc4~ tabsend~ tabreceive~ }  
	}
	{ "filters"  
		{  vcf~ noise~ env~ hip~ lop~ bp~ biquad~ samphold~ print~ rpole~ rzero~ rzero_rev~ cpole~ czero~ }  
	} 
	{ "delay"  
		{  delwrite~ delread~ vd~ }  
	} 
} 

{ "vanilla audio math" 
	{ "arithmetic"
		{  +~ -~ *~ /~  } 
	} 
	{ "fourier transforms"  
		{  fft~ ifft~ rfft~ rifft~ framp~ }  
	}
	{ "maximum or minimum of 2 inputs"  
		{  max~ min~ }  
	} 
	{ "misc"  
		{  q8_rsqrt~ q8_sqrt~ wrap~ }  
	} 
} 

{ "--" }

{ "gem video" 
	{ "input output"
		{  pix_film pix_image } 
	} 
	{ "effects"  
		{  pix_gain }  
	}
} 