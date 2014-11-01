Welcome to the Pitch Level Specification Information Page
Each Level is defined by three parameters
	1. Number of Instruments out of tune
	2. Level out of Tune
	3. Which Instruments are out of Tune

Each category is broken up as follows:
1. Number of Instruments
	1. Level 1: (0 or 1 Instrument out of tune)
	2. Level 2: (0-2 Instruments out of tune)
	3. Level 3: (0-3 Instruments out of tune)
2. Level out of Tune
	1. Level 1: (Instrument is the most out of tune)
	2. Level 2: (Insttument is at a middle level of out of tune)
	3. Level 3: (Instrument is at the lowest level out of tune)
3. Voices out of Tune
	1. Level 1: (1 instrument out of tune (outside voices only))
	2. Level 2: (0-2 of outside voices are out of tune)
	3. Level 3: (0-1 of outside voices plus 0-1 of any other voice)
	4. Level 4: (0-2 of any instrument out of tune)

Example Level Specification:
	"Level": "1",   //Level Name 
		"Number": "1", //States that the number of instrument of out tune is a level 1
		"Tune": "1", //States that the level out of tune is at level 1
		"Voices": "1", //States that the number of voices out of tune is at level 1

To change a level, change the value in quotes to match on of the levels listed above

