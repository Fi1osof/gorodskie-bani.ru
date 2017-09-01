<?php

$xpdo_meta_map = array (
); 


$this->map['modResource']['composites']['Company'] = array(
    'class' => 'modCompany',
    'local' => 'id',
    'foreign' => 'resource_id',
    'cardinality' => 'one',
    'owner' => 'foreign',
);