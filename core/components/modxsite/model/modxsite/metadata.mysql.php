<?php

$xpdo_meta_map = array (
); 

// $this->loadClass("modUser");

$this->map['modResource']['composites']['Company'] = array(
    'class' => 'modCompany',
    'local' => 'id',
    'foreign' => 'resource_id',
    'cardinality' => 'one',
    'owner' => 'foreign',
);

$this->map['modUser']['fields']['delegate'] = NULL;

$this->map['modUser']['fieldMeta']['delegate'] = array(
	"default"	=> null,
	"dbtype"	=> "enum",
	"precision"	=> "'0','1'",
	"phptype"	=> "string",
	"null"		=> true,
	"index"		=> "index",
);
