<?php

$this->map['modResource']['composites']['SearchIndexes'] = array(
    'class' => 'modSearchIndex',
    'local' => 'id',
    'foreign' => 'resource_id',
    'cardinality' => 'many',
    'owner' => 'local',
);
