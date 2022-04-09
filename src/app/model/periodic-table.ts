export class PeriodicTable {

	public atomicNumber: number;									// atomic number: invariant, identifies the element, represents
																	// the number of protons in the nucleus of the atom  (becomes _id in mongo)
	public symbol: string;											// symbol
	public name: string;											// name
	public atomicMass: string;										// mass number: varies, identifies the isotope, represents the sum of protons
																	// and neutrons in the nucleus of the atom
	public cpkHexColor: string;									    // color
	public electronConfiguration: string;
	public electronegativity: string;								// valence, outer energy level electrons involved in covalent bond ?
	public atomicRadius: string;
	public ionizationEnergy: string;
	public electronAffinity: string;
	public oxidationStates: string;
	public standardState: string;
	public meltingPoint: string;
	public boilingPoint: string;
	public density: string;
	public groupBlock: string;										// group/family: metal, metalloid, non-metal etc.
	public yearDiscovered: string;

    constructor() {
        this.atomicNumber = null;
        this.symbol = '';
        this.name = '';
        this.atomicMass = '';
        this.cpkHexColor = '';
        this.electronConfiguration = '';
        this.electronegativity = '';
        this.atomicRadius = '';
        this.ionizationEnergy = '';
        this.electronAffinity = '';
        this.oxidationStates = '';
        this.standardState = '';
        this.meltingPoint = '';
        this.boilingPoint = '';
        this.density = '';
        this.groupBlock = '';
        this.yearDiscovered = '';
    }
    
}