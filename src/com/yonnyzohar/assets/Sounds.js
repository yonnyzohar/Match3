package com.yonnyzohar.assets
{
	
	import flash.events.Event;
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;
	import flash.utils.Dictionary;

	 function Sounds
	{
		[Embed(source='sounds/cheers1.mp3')]
		 const CHEERS:Class;
		 var cheers:Sound;
		
		[Embed(source='sounds/success.mp3')]
		 const SUCCESS:Class;
		 var success:Sound;
		
		[Embed(source='sounds/country-road.mp3')]
		 const BG_MUSIC:Class;
		 var bgMusic:Sound;
		
		[Embed(source='sounds/chicken.mp3')]
		 const CHICKEN:Class;
		
		[Embed(source='sounds/dog.mp3')]
		 const DOG:Class;
		
		[Embed(source='sounds/cat.mp3')]
		 const CAT:Class;
		
		[Embed(source='sounds/donkey.mp3')]
		 const DONKEY:Class;
		
		[Embed(source='sounds/horse2.mp3')]
		 const HORSE:Class;
		
		[Embed(source='sounds/pigi.mp3')]
		 const PIG:Class;
		
		[Embed(source='sounds/sheep.mp3')]
		 const SHEEP:Class;
		
		[Embed(source='sounds/turkey.mp3')]
		 const TURKEY:Class;
		
		[Embed(source='sounds/cow.mp3')]
		 const COW:Class;
		
		[Embed(source='sounds/bani.mp3')]
		 const BUNNY:Class;
		
		[Embed(source='sounds/failSound.mp3')]
		 const FAIL:Class;
		 var fail:Sound;
		
		 var dict:Dictionary = new Dictionary();
		
		 var isPlaying= false;
		 var soundChannel:SoundChannel = new SoundChannel();
		
		 var myTransform:SoundTransform = new SoundTransform();
		 var bgChannel:SoundChannel = new SoundChannel();
		
		  function init()
		{
			bgMusic = new BG_MUSIC();
			bgChannel = bgMusic.play(0, int.MAX_VALUE);
			myTransform.volume = 0.4;
			bgChannel.soundTransform = myTransform;
			
			success = new SUCCESS();
			
			cheers = new CHEERS();
			fail = new FAIL();
			
			dict["Symbol1"] = new CAT();
			dict["Symbol2"] = new BUNNY();
			dict["Symbol3"] = new DOG();
			dict["Symbol4"] = new PIG();
			dict["Symbol5"] = new TURKEY();
			dict["Symbol6"] = new COW();
			dict["Symbol7"] = new CHICKEN();
			dict["Symbol8"] = new DONKEY();
			dict["Symbol9"] = new SHEEP();
			dict["Symbol10"] = new HORSE();
			
		}
		
		  function playSound(_name:String)
		{
			if(!isPlaying)
			{
				isPlaying = true;
				soundChannel = dict[_name].play();
				soundChannel.addEventListener(Event.SOUND_COMPLETE, onSoundComplete);
			}
		}
		
		  function stopSound()
		{
			if(isPlaying)
			{
				isPlaying = false;
				soundChannel.stop();
			}
		}
		
		protected  function onSoundComplete(event:Event)
		{
			isPlaying = false;
		}
		
		  function playSuccess()
		{
			success.play();
		}
		  function playCheers()
		{
			cheers.play();
		}
		  function playFail()
		{
			fail.play();
		}
	}
}