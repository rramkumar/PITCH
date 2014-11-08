Welcome to the Pitch Level Specification Information Page
Each Level is defined by three parameters
	1. Number of Instruments out of tune
	2. Level out of Tune
	3. Which Instruments are out of Tune

Each category is broken up as follows:
1. Number of Instruments
	1: 0-1 Instrument out of tune
	2: 0-2 Instruments out of tune
2. Level out of Tune
	1: very out of tune
	2: fairly of out of tune
	3: slightly out of tune
	4: barely out of tune
3. voicePattern out of Tune
	1: outside voices only
	2: inside voice only
	3: any voices

Example Level Specification:
	"level":6,   			//Level Name 
	"numberOutOfTune":2, 	//number of instruments of out tune is 0-2
	"tune":2, 				//fairly of out of tune
	"voicePattern":1, 		//only outside voices may be out of tune

To change a level, change the valueafter the colon to match one of the options listed above

