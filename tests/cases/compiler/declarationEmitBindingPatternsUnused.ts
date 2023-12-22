// @declaration: true
// @target: esnext
// @skipLibCheck: false

type Named = { name: string }
function notReferenced({ name: alias }: Named) {

}
function notReferencedNestedAlias({ p: { name: alias } }: { p: Named }) {
}
function notReferencedArrayAlias([a, b, { name: alias }]: Named[]) {
}



function referencedInCode({ name: alias }: Named) {
    return alias;
}

function referencedInSignarture({ name: alias }: Named): typeof alias {
    return alias;
}

function referencedInSignartureKeyword({ function: alias }: { function: string }): typeof alias {
    return null!;
}

function referencedInInferredType({ name: alias }: Named) {
    type Named2 = { name: typeof alias }
    return null! as Named2
}

function referencedInNestedFunction({ name: alias }: Named) {
    return function(p: typeof alias) {

    }
}

function referencedNestedAlias({ p: { name: alias } }: { p: Named }): typeof alias {
	return alias;
}

function referencedArrayAlias([a, b, { name: alias }]: Named[]): typeof alias {
	return alias;
}


class NotReferencedClass {
	constructor({ name: alias }: Named) {
	}
	set x({ name: alias }: Named) {
        console.log(alias);
    }
	m({ name: alias }: Named) {
        console.log(alias);
    }
}

class ReferencedInCodeClas {
	constructor({ name: alias }: Named) {
		console.log(alias);
	}
	set x({ name: alias }: Named) {
        console.log(alias);
    }
	m({ name: alias }: Named) {
        console.log(alias);
    }
}

class ReferencedInSignartureClass {
	constructor({ name: alias }: Named, p: typeof alias) {
		console.log(alias);
	}
	set x({ name: alias }: Named & { o: typeof alias }) {
        
    }
	mReturnType({ name: alias }: Named): typeof alias {
        return null!
    }
	mRerturnTypeNested({ name: alias }: Named): NonNullable<typeof alias> {
        return null!
    }
    mParameter({ name: alias }: Named, p: typeof alias) {
        return null!
    }
}

let notReferencedFnType: ({ name: alias }: Named) => void;
let referencedInSignartureReturnTypeFnType: ({ name: alias }: Named) => typeof alias;
let referencedInSignartureParamTypeFnType: ({ name: alias }: Named, p: typeof alias) => void;

let notReferencedCtorType: new ({ name: alias }: Named) => void;
let referencedInSignartureReturnTypeCtorType: new ({ name: alias }: Named) => typeof alias;
let referencedInSignartureParamTypeCtorType: new  ({ name: alias }: Named, p: typeof alias) => void;


interface NotReferencedInterface {
	({ name: alias }: Named): void
	new ({ name: alias }: Named): void
	set x({ name: alias }: Named);
	m({ name: alias }: Named);
}

interface ReferencedInSignartureInterface {
	({ name: alias }: Named, p: typeof alias): void
	({ name: alias }: Named): typeof alias
	
	new ({ name: alias }: Named, p: typeof alias): void
	new ({ name: alias }: Named): typeof alias
	set x({ name: alias }: Named & { o: typeof alias })
	mReturnType({ name: alias }: Named): typeof alias;
	mRerturnTypeNested({ name: alias }: Named): NonNullable<typeof alias>;
    mParameter({ name: alias }: Named, p: typeof alias);
}