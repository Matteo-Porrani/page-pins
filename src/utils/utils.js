
export const getLinkedEntityName = (entityName, relation) => {
	
	// data
	const e = [
		"root",
		"category",
		"folder",
		"link",
	];
	
	// guard on invalid entityName
	if (!e.includes(entityName)) return null;
	// guard on invalid relation
	if (!['parent', 'child'].includes(relation)) return null;
	
	if (relation === 'parent') {
    return e[e.indexOf(entityName) - 1];
  } else if (relation === 'child') {
    return e[e.indexOf(entityName) + 1];
  }

}
